const assert = require('assert');
process.env.TIME_TO_WAIT_TO_RESTART_INSTANCE = 10;
const checkIfRebootInstance = require('../lib/check-if-necessary-restart');
const promout = require('promout');
describe('test check reboot', () => {
    it('should return the check status', async() => {
        const status = 'DOWN';
        const rebootIfDown = false;
        const updatedAt = Date.now();
        await promout(11);
        const { reboot, newStatus } = checkIfRebootInstance(status, rebootIfDown, updatedAt);
        assert(newStatus === status);
        assert(!reboot);
        assert(typeof reboot === 'boolean');
    });

    it('should return the check status', async() => {
        const status = 'DOWN';
        const rebootIfDown = false;
        const updatedAt = Date.now();
        await promout(0);
        const { reboot, newStatus } = checkIfRebootInstance(status, rebootIfDown, updatedAt);
        assert(newStatus === status);
        assert(!reboot);
        assert(typeof reboot === 'boolean');
    });
    it('should return the check status', async() => {
        const status = 'UP';
        const updatedAt = Date.now();
        const rebootIfDown = false;
        await promout(11);
        const { reboot, newStatus } = checkIfRebootInstance(status, rebootIfDown, updatedAt);
        assert(newStatus === status);
        assert(!reboot);
        assert(typeof reboot === 'boolean');
    });

    it('should return the check status', async() => {
        const status = 'UP';
        const updatedAt = Date.now();
        const rebootIfDown = false;
        await promout(0);
        const { reboot, newStatus } = checkIfRebootInstance(status, rebootIfDown, updatedAt);
        assert(newStatus === status);
        assert(!reboot);
        assert(typeof reboot === 'boolean');
    });

    it('should return the check status', async() => {
        const status = 'DOWN';
        const rebootIfDown = true;
        const updatedAt = Date.now();
        await promout(11);
        const { reboot, newStatus } = checkIfRebootInstance(status, rebootIfDown, updatedAt);
        assert(newStatus === 'REBOOTING');
        assert(reboot);
        assert(typeof reboot === 'boolean');
    });

    it('should return the check status', async() => {
        const status = 'DOWN';
        const rebootIfDown = true;
        const updatedAt = Date.now();
        await promout(0);
        const { reboot, newStatus } = checkIfRebootInstance(status, rebootIfDown, updatedAt);
        assert(newStatus === status);
        assert(!reboot);
        assert(typeof reboot === 'boolean');
    });
    it('should return the check status', async() => {
        const status = 'UP';
        const updatedAt = Date.now();
        const rebootIfDown = true;
        await promout(11);
        const { reboot, newStatus } = checkIfRebootInstance(status, rebootIfDown, updatedAt);
        assert(newStatus === status);
        assert(!reboot);
        assert(typeof reboot === 'boolean');
    });

    it('should return the check status', async() => {
        const status = 'UP';
        const updatedAt = Date.now();
        const rebootIfDown = true;
        await promout(0);
        const { reboot, newStatus } = checkIfRebootInstance(status, rebootIfDown, updatedAt);
        assert(newStatus === status);
        assert(!reboot);
        assert(typeof reboot === 'boolean');
    });
});
