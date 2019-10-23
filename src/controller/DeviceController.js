const Device = require("../models/Device");

module.exports = {
  // Retorna o JSON do device
  async index(req, res) {
    const { device_name } = req.params;

    const device = await Device.findOne({ name: device_name });

    return res.json(device);
  },

  // Cria um novo device
  async store(req, res) {
    const { name, status } = req.body;

    let device = await Device.findOne({ name });

    if (!device) {
      device = await Device.create({ name, status });
    }

    return res.json(device);
  },

  // Atualiza status do device
  async update(req, res) {
    const { device_name } = req.params;
    const device = await Device.findOne({name: device_name})

    device.status = !device.status
    await device.save()

    const doc = await Device.findOne({name: device_name})
    return res.json(doc) 
  }
};
