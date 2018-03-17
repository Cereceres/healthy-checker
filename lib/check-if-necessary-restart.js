const defaultTimeToRestartInstance = 600000;

const {
    TIME_TO_WAIT_TO_RESTART_INSTANCE:timeToWaitToRestartInstance = defaultTimeToRestartInstance
} = process.env;

module.exports = (status, rebootIfDown, updatedAt) => {
    console.log('status ', status);
    const timeIsOver = Number(updatedAt) + Number(timeToWaitToRestartInstance) <= Date.now() ?
        '+' :
        '-';
    console.log('timeIsOver ', timeIsOver);
    const reboot = timeIsOver === '+' && status === 'DOWN' && rebootIfDown;
    console.log('reboot ', reboot);
    if (reboot) return { reboot:true, newStatus: 'REBOOTING' };

    return { newStatus: status, reboot:false };
};
