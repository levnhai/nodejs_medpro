const DocterServices = require('../../../src/services/DocterServices');

class DocterController {
  async outStandingDocter(req, res) {
    let limit = req.query.limit;
    if (!limit) limit = 2;
    try {
      let docter = await DocterServices.outStandingDocter(limit);
      return res.status(200).json({
        errCode: 0,
        message: 'successfully',
        data: docter,
      });
    } catch (error) {
      return res.status(200).json({ errCode: -1, message: 'Error from server...' });
    }
  }
}
module.exports = new DocterController();
