var jwt = require('jsonwebtoken')
const modelPath = `${process.cwd()}/${process.env.ROOT_PATH ? process.env.ROOT_PATH : ""
    }models`;

const models = require("require-all")({
    dirname: modelPath,
    filter: function (fileName) {
        return fileName.replace(".js", "");
    },
});

const ObjectId = require("mongoose").Types.ObjectId;


const bcrypt = require('bcryptjs');

module.exports = {
  login: async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
      const model = models['stts_accounts'];

      if (!model) {
        throw model;
      }

      // ค้นหาผู้ใช้ด้วยชื่อผู้ใช้
      const user = await model.findOne({ act_username: username }).populate('act_role').exec();

      if (!user) {
        return res.status(401).json({ message: 'ไม่พบผู้ใช้' });
      }

      // ตรวจสอบรหัสผ่าน
      const isPasswordValid = await bcrypt.compareSync(password, user.act_password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'รหัสผ่านไม่ถูกต้อง' });
        
      }

      // รหัสผ่านถูกต้อง, สร้าง JWT token
      const userPayload = {
        id: user._id,
        USERNAME: user.act_username,
        FIRST_NAME: user.act_first_name_th,
        LAST_NAME: user.act_last_name_th,
        EMAIL: user.act_email_address,
        role: user.act_role.rol_name,
      };

      const token = jwt.sign(userPayload, 'IVSOFT', { expiresIn: '3600s' });
      userPayload.token = token;

      res.status(200).json({
        statusText: 'Login Success',
        user: userPayload,
      });
    } catch (error) {
      console.log('Error At mongoose-find:', error);
      res.status(500).json({ message: 'เกิดข้อผิดพลาด' });
    }
  }
};
