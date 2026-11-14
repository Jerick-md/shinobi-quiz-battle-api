
'use strict';

const { matchedData } = require('express-validator');

const sessionService = require('../services/session.service');
const playerService = require('../services/player.service');

async function create(req, res) {
  const data = matchedData(req, { locations: ['body'] });

  const session = await sessionService.create(
    data.questionSetId,
    req.user
  );

  return res.status(201).json(session);
}

async function get(req, res) {
  const { code } = matchedData(req, { locations: ['params'] });

  const session = await sessionService.getByCode(code);

  return res.status(200).json(session);
}

async function changeStatus(req, res) {
  const params = matchedData(req, { locations: ['params'] });
  const body = matchedData(req, { locations: ['body'] });

  const session = await sessionService.changeStatus(
    params.code,
    body.status,
    req.user
  );

  return res.status(200).json(session);
}

async function join(req, res) {
  const params = matchedData(req, { locations: ['params'] });
  const body = matchedData(req, { locations: ['body'] });

  const result = await playerService.join(
    params.code,
    body,
    req.user
  );

  return res.status(result.created ? 201 : 200).json({
    player: {
      playerId: result.player.playerId,
      nickname: result.player.nickname,
      avatar: result.player.avatar,
      chakra: result.player.chakra,
    },
    rejoined: !result.created,
    session: {
      code: result.session.joinCode,
      status: result.session.status,
    },
  });
}

async function listPlayers(req, res) {
  const { code } = matchedData(req, { locations: ['params'] });

  const players = await playerService.listBySession(code);

  return res.status(200).json(players);
}

module.exports = {
  create,
  get,
  changeStatus,
  join,
  listPlayers,
};
