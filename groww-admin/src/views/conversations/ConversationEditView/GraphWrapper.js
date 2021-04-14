import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import dagre from 'dagre';
import ReactFlow, { useStoreState, isNode, removeElements, getOutgoers, Background, Controls, useZoomPanHelper } from 'react-flow-renderer';
import SideBar from './SideBar';

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
            // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
            el.position = {
                x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
                y: nodeWithPosition.y - nodeHeight / 2,
            };
        }

        return el;
    });
};

const useStyles = makeStyles((theme) => ({
    graphView: {
        height: '93.25vh',
        width: 2.5 * theme.breakpoints.width("sm"),
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '10px',
    },
    searchNode: {
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 4,
        width: 300
    }
}));

function GraphWrapper({ conversation }) {
    const classes = useStyles();
    const [reactflowInstance, setReactflowInstance] = React.useState(null);
    const [elements, setElements] = React.useState(getLayoutedElements(conversation?.routes || []));
    const onElementsRemove = (elementsToRemove) => {
        setElements((els) => removeSubTree(elementsToRemove, els))
    };
    function removeSubTree(elementsToRemove, els) {
        let newElementsToRemove = [];
        let node = '';
        let arr = elementsToRemove.filter((e) => isNode(e));
        let nodeList = els.filter((e) => isNode(e));
        while (arr.length > 0) {
            node = arr.shift()
            newElementsToRemove.push(node);
            arr = arr.concat(getOutgoers(node, els));
        }
        if (nodeList.length === newElementsToRemove.length) {
          
            return els;
        }
        return removeElements(newElementsToRemove, els);
    }
    const nodes = useStoreState((store) => store.nodes);
    const { setCenter } = useZoomPanHelper();

    const focusNode = (e, node) => {
        if (node == null) {
            reactflowInstance.fitView()
            return;
        }
        const x = node.__rf.position.x + node.__rf.width / 2;
        const y = node.__rf.position.y + node.__rf.height / 2;
        const zoom = 1.85;
        setCenter(x, y, zoom);
    };

    const onLoad = React.useCallback(
        (rfi) => {
            if (!reactflowInstance) {
                setReactflowInstance(rfi);
            }
        },
        [reactflowInstance]
    );

    React.useEffect(() => {
        if (reactflowInstance && elements.length > 0) {
            reactflowInstance.fitView()
        }
    }, [reactflowInstance, elements.length]);

    return (

        <Grid container item xs={12}>
            <Grid item>
                <Box className={classes.graphView}>
                    <ReactFlow
                        elements={elements}
                        onLoad={onLoad}
                        nodesDraggable={false}
                        nodesConnectable={false}
                        onElementsRemove={onElementsRemove}
                        deleteKeyCode={46} /* 'delete'-key */
                    >
                        <Background variant="lines" />
                        <Controls />
                        <Autocomplete
                            clearOnEscape
                            autoHighlight
                            blurOnSelect
                            onChange={focusNode}
                            options={nodes}
                            getOptionLabel={(node) => node.data.label}
                            className={classes.searchNode}
                            renderInput={(params) => <TextField {...params} label="Search inside your bot" variant="outlined" />}
                        />
                    </ReactFlow>
                </Box>
            </Grid>
            <Grid item xs>
                <SideBar />
            </Grid>
        </Grid>

    );
}

export default GraphWrapper;