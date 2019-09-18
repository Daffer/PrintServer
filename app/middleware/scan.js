const settings = require('../interfaces/iScanSettings');

//==================================//
//          SCAN CONTROLLER         //
//==================================//

class ScanController {
    //  render  //
    static async getSettings() {
        return settings.getAllOptions();
    }
}

module.exports = {
    ScanController: ScanController
};