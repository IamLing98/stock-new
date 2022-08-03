import React, { Component, useEffect } from 'react';

export default function ChildMessageRenderer({ node, colDef, context, value }) {
    const invokeParentMethod = () => {
        context.componentParent.methodFromParent(node.rowIndex);
    };

    useEffect(() => {
        console.log('Params:', node, colDef, context, value);
    }, []);

    return <>{colDef?.render(node?.data)}</>;
}
