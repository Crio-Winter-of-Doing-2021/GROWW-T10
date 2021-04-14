import React from 'react';
import { Message } from './message';
import { mapObjectNonBooleanValues } from '../util/react'
import { INPUT } from '../constants'
export const Text = props => {

    const textProps = mapObjectNonBooleanValues({
        ...props,
        ...{ children: React.Children.toArray(props.children) },
    })
    return (
        <Message  {...textProps} type={INPUT.TEXT} />
    );
}