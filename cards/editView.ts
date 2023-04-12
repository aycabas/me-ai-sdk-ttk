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
                type: 'Input.Text',
                id: 'prompt',
                placeholder: 'Enter a new prompt that updates the post below',
                isMultiline: true
            },
            {
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
                minHeight: '160px',
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
            }
        ],
        actions: [
            {
                type: 'Action.Submit',
                title: 'Update',
                data: {
                    verb: 'update'
                }
            },
            {
                type: 'Action.Submit',
                title: previewMode ? 'Preview' : 'Post',
                data: {
                    verb: previewMode ? 'preview' : 'post'
                }
            }
        ]

    });
}