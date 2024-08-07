
'use client';
import styles from "../app/page.module.css";
import React, { useEffect, useState } from 'react';

const factTemplate = (label: string, description: string) => {
    return (
        <div className = {styles.factTemplate}>
            <h2>{label}</h2>
            </div>
    );
};



const ScrollingFacts = (data: any, clickReaction : any) => {
    if (!data || !data.facts || !data.facts.dei) {
        console.log(data);
        return <div>Loading...</div>;
        
    };
console.log(data);
const dataToShow = data.facts.dei;
return (
    <div>
            {(dataToShow as any[]).map(fact => (
                <div key={fact.label} onClick={() => clickReaction(fact)}>
                    {factTemplate(fact.label, fact.description)}
                </div>
            ))}
        </div>
)
};
export default ScrollingFacts;