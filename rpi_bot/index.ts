import Comms = require('./comms/communication-manager');
import Logger from './util/logging';
import Movement = require('./movement/movement-manager');

/**
 * Initialises the Robot.
 */
export function initialise(): void {
  Logger.verbose('Initialising...');

  // Start connection(s)
  Comms.startServer(Comms.CommunicationType.All);
  // Enable discoverability service (e.g. be discoverable by UDP broadcast)
  Comms.startDiscoveryService();

  // Initialise Agent
  const bot = Movement.setAgent(Movement.AgentType.DifferentialDrive);

  // Initialisation complete
  Logger.info('Initialisation complete');

  // Testing
  bot.move(Movement.MovementType.Forward);
}

// // Power save.
// const TIMEOUT_POWER_SAVE = 60000; // 60 seconds
// setTimeout(() => {
//   Comms.stopDiscoveryService();
// }, TIMEOUT_POWER_SAVE);

initialise();
