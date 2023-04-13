// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Attachment, CardFactory } from 'botbuilder';
// Import the providers and credential at the top of the page

/**
 *
 */
export function createInitialView(): Attachment {
    return CardFactory.adaptiveCard({
        $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
        type: 'AdaptiveCard',
        version: '1.4',
        body: [
                {
                    type: 'Input.Text',
                    id: 'prompt',
                    placeholder: 'Enter a prompt for GPT',
                    isMultiline: true,
                    isRequired: true,
                    errorMessage: 'A prompt is required'
                }
            ],
            actions: [
                        {
                            type: 'Action.Submit',
                            title: 'Generate',
                            data: {
                                verb: 'generate'
                            }
                        }
                    ]              
        });
}