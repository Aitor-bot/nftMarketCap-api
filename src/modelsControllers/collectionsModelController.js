const LogService = require("../services/LogService/LogService");
const LogType = require("../services/LogService/LogTypeEnum");
const settings = require('../../settings.json');
const collectionModel = require('../models/collectionsModel');
const collectionsStatsModel = require('../models/collectionsStatsModel');

this._logService = new LogService();

exports.getAllCollections = async () => {
    let allCollections = null;
    try {
        allCollections = await collectionModel.find();
    } catch (error) {
        this._logService.log("Error de BBDD, en getAllCollections. ERROR: " + error, LogType.Error);
    }

    return allCollections;
}

exports.getAllActiveCollections = async () => {
    let allActiveCollections = null;
    try {
        allActiveCollections =  await collectionModel.find({Expired: false})
    } catch (error) {
        this._logService.log("Error de BBDD, en getAllActiveCollections. ERROR: " + error, LogType.Error);
    }

    return allActiveCollections;
}

exports.getCollectionsStatsWithMinVolumen = async () => {
    let collectionsStats = null;
    try {
        collectionsStats =  await collectionsStatsModel.find({ VolumenAll: { $gt: settings.Collections.MinVolumenExpiredCollections }})
    } catch (error) {
        this._logService.log("Error de BBDD, en getCollectionsStatsWithVolumenGraterT10. ERROR: " + error, LogType.Error);
    }

    return collectionsStats;
}


exports.getAllCollectionsStats = async () => {
    let allCollectionsStats = null;
    try {
        allCollectionsStats = await collectionsStatsModel.find();
    } catch (error) {
        this._logService.log("Error de BBDD, en getAllCollectionsStats. ERROR: " + error, LogType.Error);
    }

    return allCollectionsStats;
}