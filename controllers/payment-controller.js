const Payment = require("../models/payment");

const update = async (req, res) => {
  try {
    const start = new Date();
    var isoDateTime = new Date(
      start.getTime() - start.getTimezoneOffset() * 60000
    );
    const id = req.params.id;
    const { dp } = req.body;
    await Payment.update(
      {
        dp: dp,
        updated_at: isoDateTime,
      },
      { where: { order_id: id } }
    );
    res.status(200).json({ message: 'Berhasil update payment' })
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { update };
