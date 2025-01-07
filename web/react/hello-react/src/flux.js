const Dispatcher = function() {
    return {
        _stores: [],
        register: function(store) {
            if (!store || !store.update) {
                throw new Error(
                    'You should provide a store that has an `update` method'
                )
            } else {
                const consumers = [];
                const change = function() {
                    consumers.forEach(consumer => {
                        consumer(store)
                    })
                }
                const subscribe = function(consumer, noInit) {
                    consumers.push(consumer)
                    !noInit ? consumer(store): null
                };
                this._stores.push({store: store, change: change});
                return subscribe;
            }
        },
        dispatch: function(action) {
            if (this._stores.length > 0) {
                this._stores.forEach(entry => {
                    entry.store.update(action, entry.change);
                })
            }
        }
    }
}

export default {
    create() {
        const dispatcher = Dispatcher();
        return {
            createAction(type) {
                if (!type) {
                    throw new Error('Please, provide action\'s type.');
                } else {
                    return function(payload) {
                        return dispatcher.dispatch({
                            type: type,
                            payload: payload
                        })
                    };
                }
            },
            createSubscriber(store) {
                return dispatcher.dispatch(store);
            }
        }
    }
}