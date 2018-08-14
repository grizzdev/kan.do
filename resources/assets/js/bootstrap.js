window._ = require('lodash');
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    /* eslint-disable no-console */
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
    /* eslint-enable no-console */
}

import 'babel-regenerator-runtime';
import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { reducers } from './reducers';
import { sagas } from './sagas';
import { components } from './components';
import createSagaMiddleware from 'redux-saga';
import Cookies from 'js-cookie';

const rootReducer = (state, action) => {
    if (! action.type.match(/:/)) {
        return {...initialData, ...state};
    }

    const [reducerName, methodName] = action.type.split(':');
    const reducerMethod = reducers[reducerName] && reducers[reducerName][methodName];
    const reducerState = state[reducerName] || initialData[reducerName];
    const newReducerState = reducerMethod ? reducerMethod(reducerState, action.payload, action.error) : reducerState;

    return {...state, [reducerName]: newReducerState};
};

const initialData = Object.keys(reducers).reduce(function (initial, reducerName) {
    const initialReducerInitial = reducers[reducerName].initial;
    const reducerInitial = typeof initialReducerInitial === 'undefined' ? null : initialReducerInitial;

    return {...initial, [reducerName]: reducerInitial};
}, {});

const state = Cookies.get('state');
const initialState = state ? JSON.parse(state) : {};
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(sagaMiddleware)));

const attributesToObject = attrs => Array.prototype.reduce.call(attrs, (obj, attr) => {
    obj[attr.name] = attr.value;
    return obj;
}, {});

const mount = (node, Component) => {
    if (node._componentConstructor) {
        return;
    }

    render(
        <Provider store={store}>
            <Component innerHTML={node.innerHTML} {...attributesToObject(node.attributes)} />
        </Provider>,
        node.parentNode,
        node
    );

    node._component = Component;
};

const forEachNode = (selector, iterator) => {
    const nodes = document.querySelectorAll(selector);
    Array.prototype.forEach.call(nodes, iterator);
};

const mountEachNode = (tag, Component) => forEachNode(tag, node => mount(node, Component));

const register = (tag, Component) => {
    mountEachNode(tag, Component);

    const observer = new MutationObserver(() => {
        mountEachNode(tag, Component);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
};

sagas.map(saga => sagaMiddleware.run(saga));

Object.keys(components).forEach(tag => {
    const path = components[tag];
    const { default: Component } = require(`./components/${path}`);

    register(tag, Component);
});

export const bind = (context, names) => {
    names.forEach(name => {
        const original = context[name];
        context[name] = function bound() {
            return original.apply(context, arguments);
        };
    });
};

export const getClosest = (elem, selector) => {
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s), i = matches.length;

                /* eslint-disable no-empty */
                while (--i >= 0 && matches.item(i) !== this) {}
                /* eslint-enable no-empty */

                return i > -1;
            };
    }

    for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) return elem;
    }

    return null;
};
