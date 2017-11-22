/**
 * @file index
 * @author abingblog@gmail.com
 */

import {router} from 'san-router';


import HomePage from './Home';

router.add({
    target: '#content',
    rule: '/home',
    Component: HomePage
});
