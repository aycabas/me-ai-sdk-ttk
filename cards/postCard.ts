// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Attachment, CardFactory } from 'botbuilder';
// Import the providers and credential at the top of the page
import config from '../config';
import { AppCredential, AppCredentialAuthConfig, createMicrosoftGraphClientWithCredential } from "@microsoft/teamsfx";
import "isomorphic-fetch";

const appAuthConfig: AppCredentialAuthConfig = {
    authorityHost: config.authorityHost,
    clientId: config.clientId,
    tenantId: config.tenantId,
    clientSecret: config.clientSecret,
};
const scope = ".default";
const appCredential = new AppCredential(appAuthConfig);
const graphClient = createMicrosoftGraphClientWithCredential(appCredential, scope);
/**
 * @param post
 * @param peoplepicker
 */

export async function createPostCard(post: string, peoplepicker: string): Promise<Attachment> {

    if (peoplepicker != null) {
        let peopleArray = peoplepicker.split(',');
        let displayNameArray = [];
        for (let i = 0; i < peopleArray.length; i++) {
            let person = await graphClient.api(`/users/${peopleArray[i]}`).get();
            displayNameArray.push(
                {
                    'type': 'mention',
                    'text': `<at>${person.displayName}</at>`,
                    "mentioned": {
                        "id": person.userPrincipalName,
                        "name": person.displayName
                    },
                    'id': i.toString() // Assign a unique ID to each mention
                });

        }

        console.log(displayNameArray);

        const body: any = [{
            type: 'TextBlock',
            text: post,
            wrap: true
        }];

        displayNameArray.forEach((displayName) => {
            body.push({
                type: 'TextBlock',
                text: `<at>${displayName.mentioned.name}</at>`,
                size: 'Small',
                wrap: true,
                horizontalAlignment: 'Right',
                isSubtle: true
            });
        });

        const card = CardFactory.adaptiveCard({
            '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
            'type': 'AdaptiveCard',
            'version': '1.4',
            'body': body,
            'msteams': {
                'entities': displayNameArray
            }
        });
        return card;
    }
    else {
        const card = CardFactory.adaptiveCard({
            '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
            'type': 'AdaptiveCard',
            'version': '1.4',
            'body': [{
                type: 'TextBlock',
                text: post,
                wrap: true
            }],
        });
        return card;
    }
}



