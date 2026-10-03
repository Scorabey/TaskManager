const actions = require('./TaskManager/TaskManager');

(async () => {
    while(true) {
        const action = await actions.menu()

        if(!action || action === "exit") break;

        await actions[action]()
    }
})();
