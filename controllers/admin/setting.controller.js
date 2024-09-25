const GeneralSetting = require('../../models/general-settings.model');

// [get] admin/setting/general
module.exports.general = async (req, res) => {
    const generalSettingConfiguration = await GeneralSetting.findOne({});
    res.render('admin/pages/setting/general', {
        pageTitle: 'General setting',
        setting: generalSettingConfiguration
    });
};

//[patch] admin/setting/general
module.exports.generalUpdate = async (req, res) => {
    console.log(req.body);

    const generalSettingConfiguration = new GeneralSetting(req.body);
    generalSettingConfiguration.save();

    res.redirect('/admin/setting/general');
};