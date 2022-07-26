// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    // id: 'request',
    // title: 'Requests',
    // caption: 'Pages Caption',
    // type: 'group',
    children: [
        {
            id: 'request',
            title: 'Requests',
            type: 'collapse',
            icon: icons.IconKey,

            children: [
                {
                    id: 'devices',
                    title: 'devices',
                    type: 'item',
                    url: '/pages/login/login3',
                    target: true
                },
                {
                    id: 'Training',
                    title: 'ICT Training',
                    type: 'item',
                    url: '/pages/register/register3',
                    target: true
                }
            ]
        }
    ]
};

export default pages;
