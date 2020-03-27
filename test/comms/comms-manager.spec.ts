import 'mocha';
import { expect } from 'chai';
import CommunicationManager = require('../../src/comms/comms-manager');
import Discovery = require('../../src/comms/discovery-service');
import TCP = require('../../src/comms/net/tcp-server');

describe('Communication Manager', function () {
  after(async function () {
    await Discovery.disable();
    await TCP.close();
    // await UDP.close();
  });

  it('should enable Discovery Service', function () {
    CommunicationManager.startDiscoveryService();
    const enabled = Discovery.isEnabled();
    expect(enabled).to.equal(true);
  });

  it('should disable Discovery Service', async function () {
    await CommunicationManager.stopDiscoveryService();
    const enabled = Discovery.isEnabled();
    expect(enabled).to.equal(false);
  });

  // it('should start a UDP server', function () {
  //   CommunicationManager.startServer(
  //     CommunicationManager.CommunicationType.UDP,
  //   );
  //   const enabled = UDP.isEnabled();
  //   expect(enabled).to.equal(true);
  // });

  // it('should stop a UDP server', function () {
  //   CommunicationManager.stopServer(
  //     CommunicationManager.CommunicationType.UDP
  //   );
  //   const enabled = UDP.isEnabled();
  //   expect(enabled).to.equal(false);
  // });

  it('should start a TCP server', async function () {
    await CommunicationManager.startServer(
      CommunicationManager.CommunicationType.TCP,
    );
    const enabled = TCP.isEnabled();
    await TCP.close();
    expect(enabled).to.equal(true);
  });

  it('should stop a TCP server', async function () {
    await CommunicationManager.startServer(
      CommunicationManager.CommunicationType.TCP,
    ); // Will skip if already started
    await CommunicationManager.stopServer(
      CommunicationManager.CommunicationType.TCP,
    );
    const enabled = TCP.isEnabled();
    await TCP.close();
    expect(enabled).to.equal(false);
  });
});
