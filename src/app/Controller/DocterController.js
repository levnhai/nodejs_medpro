const DocterServices = require('../../../src/services/DocterServices');

class DocterController {
  async outStandingDocter(req, res) {
    console.log(1);
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
      let docter = await DocterServices.outStandingDocter(limit);
      console.log('Docter: ', docter);
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
