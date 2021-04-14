import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import dagre from 'dagre';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useStoreState, useStoreActions, getOutgoers, addEdge, isNode } from 'react-flow-renderer';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;


const getLayoutedElements = (elements, direction = 'LR') => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    elements.forEach((el) => {
        if (isNode(el)) {
            dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
        } else {
            dagreGraph.setEdge(el.source, el.target);
        }
    });

    dagre.layout(dagreGraph);

    return elements.map((el) => {
        if (isNode(el)) {
            const nodeWithPosition = dagreGraph.node(el.id);
            el.targetPosition = isHorizontal ? 'left' : 'top';
            el.sourcePosition = isHorizontal ? 'right' : 'bottom';

            // unfortunately we need this little hack to pass a slighltiy different position
            // to notify react flow about the change. More over we are shifting the dagre node position
            el.position = {
                x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
                y: nodeWithPosition.y - nodeHeight / 2,
            };
        }

        return el;
    });
};

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));




function SideBar() {
    const [open, setOpen] = React.useState(true);
    const classes = useStyles();
    const selectedNode = useStoreState((store) => store.selectedElements);
    const edges = useStoreState((store) => store.edges);
    const nodes = useStoreState((store) => store.nodes);
    const setElements = useStoreActions(actions => actions.setElements);
    const choices = ["MultiChoice", "Redirect", "Close"];
    const [state, setState] = React.useState({
        action: '',
        label : ''
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    React.useEffect(() => {
        if (selectedNode) {
            setState({ 
                action: selectedNode[0].data.action,
                label: selectedNode[0].data.label
             });
        }
    }, [selectedNode])



    const handleClick = (e) => {
        let currentNode = selectedNode[0];
        let node = {};
        let length = nodes.length + 1;
        node.id = length;
        node.data = { label: `node ${node.id}` }
        node.position = { x: 0, y: 0 };
        node.type = 'default';
        let newNodes = nodes.concat(node);
        let edge = {};
        edge.source = currentNode.id;
        edge.target = node.id;
        edge.arrowHeadType = 'arrowclosed'
        let newElements = addEdge(edge, [...newNodes, ...edges]);
        let updatedElements = newElements.map((el) => {
            if (isNode(el)) {
                return {
                    ...el, position: {
                        x: 0,
                        y: 0,
                    }
                }
            }
            return el;
        });
        setElements(getLayoutedElements(updatedElements));
    }

    /*const updateNode = (e) => {
        const index = conversations.findIndex((conversation) => conversation.id === value);
        let newConversations = [...conversations];
        newConversations[index] = { ...newConversations[index], isActive: !newConversations[index].isActive }
        setConversations(newConversations);
    }
    */

    return (

        <Paper variant="outlined" >
            {selectedNode &&
                <Grid container direction="column" >
                    <Button variant="contained" onClick={handleClick} color="secondary">
                        Save
                    </Button>
                    <FormControl variant="outlined" className={classes.formControl}>

                    <TextField
                        value={state.label}
                        onChange={handleChange}
                        name="label"
                        label="Node Name"
                        variant="outlined"
                    />
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Select Bot Node</InputLabel>
                        <Select
                            native
                            value={state.action}
                            onChange={handleChange}
                            label="Select Bot Node"
                            inputProps={{
                                name: 'action',
                                id: 'outlined-age-native-simple',
                            }}
                        >
                            {choices.map((choice) => <option key={choice} value={choice}>{choice}</option>)}
                        </Select>
                    </FormControl>


                    {state.action === 'MultiChoice' && <Grid item>MultiChoice</Grid>}
                    {state.action === 'Redirect' && <Grid item>Redirect</Grid>}
                    {state.action === 'Close' && <Grid item>Close</Grid>}

                    <Button variant="outlined" color="primary">
                        Update Node
                    </Button>
                    <Button variant="outlined" onClick={handleClick} color="secondary">
                        Add new Node
                    </Button>

                </Grid>
            }
        </Paper>


    );
}

export default SideBar;
