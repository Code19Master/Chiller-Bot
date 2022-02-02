const { client } = require(".");
const config = require("./config.json");

module.exports = async (client) => {
    const CMD = [
        {
            name: 'ping',
            description: 'I wonder what this does'
        },
        {
            name: 'reaction-role-add',
            description: 'Reaction role using buttons',
            options: [{
                name: 'msg',
                description: 'Message that is sent',
                type: 'STRING',
                required: true
            },
            {
                name: 'role',
                description: 'The role to be added or removed',
                type: 'ROLE',
                required: true
            }]
        }
    ]
    await client.application?.commands.set(CMD);
}