// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Attachment, CardFactory } from 'botbuilder';

/**
 * @param post
 * @param previewMode
 * @param peoplepicker
 */
export function createEditView(post: string, previewMode: boolean): Attachment {
    // Put these code in a call-to-action callback function to avoid browser blocking automatically showing up pop-ups. 
    return CardFactory.adaptiveCard({
        $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
        type: 'AdaptiveCard',
        version: '1.4',
        body: [
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "items": [
                            {
                                type: 'Input.Text',
                                id: 'prompt',
                                placeholder: 'Enter a prompt for GPT',
                                isMultiline: true
                            },
                            {
                                "type": "ActionSet",
                                "separator": true,
                                actions: [
                                    {
                                        type: 'Action.Submit',
                                        title: 'Generate',
                                        associatedInputs:'auto',
                                        data: {
                                            verb: 'generate'
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "items": [{
                            type: "Input.ChoiceSet",
                            choices: [],
                            "choices.data": {
                                "type": "Data.Query",
                                "dataset": "graph.microsoft.com/users"
                            },
                            id: "peoplepicker",
                            isMultiSelect: true
                        },
                        {
                            type: 'Container',
                            verticalContentAlignment: 'Center',
                            items: [
                                {
                                    type: 'TextBlock',
                                    wrap: true,
                                    text: post
                                },
                                {
                                    type: 'Input.Text',
                                    id: 'post',
                                    isVisible: false,
                                    value: post
                                }
                            ]
                        },
                        {
                            "type": "ActionSet",
                            "separator": true,                            
                            actions: [
                                {
                                    type: 'Action.Submit',                                                                   
                                    title: previewMode ? 'Preview' : 'Post',
                                    data: {
                                        verb: previewMode ? 'preview' : 'post'                                        
                                    }
                                }]
                            }]
                       }]
                    }]
                });
}