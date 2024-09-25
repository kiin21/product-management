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
    let generalSettingConfiguration = await GeneralSetting.findOne();

    if (generalSettingConfiguration) {
        await GeneralSetting.updateOne({}, req.body);
    } else {
        generalSettingConfiguration = new GeneralSetting(req.body);
        await generalSettingConfiguration.save();
    }

    res.redirect('/admin/setting/general');
};