let express = require('express');
let router = express.Router();
let models = require ('../db/models/index');
let { check, param, body, validationResult } = require ('express-validator/check');

let uuidv4 = require('uuid/v4');
/**
 * @swagger
 * definitions:
 *   resource:
 *     properties:
 *       name:
 *         type: string
 *       displayName:
 *         type: string
 *       technicalName:
 *         type: integer
 *       status:
 *         type: string
 *       resourceOwner:
 *         type: string
 *       resourceManager:
 *         type: string
 *       architecte:
 *         type: string
 */

/**
 * @swagger
 * /resource:
 *   get:
 *     tags:
 *       - resource
 *     description: Returns all resources
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of resource
 *         schema:
 *           $ref: '#/definitions/resource'
 */

router.get ('/', function (req, res, next) {
	console.log ("GET /resource");
	models.Resource.findAll({})
		.then(function(resources) {
			res.json(resources)
	});
});

/**
 * @swagger
 * /resource/{id}:
 *   get:
 *     tags:
 *       - resource
 *     description: Returns a single resource object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: resource'id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description:
 *         schema:
 *           $ref: '#/definitions/resource1'
 */
router.get ('/:id', [ param('id').isUUID(4) ], function (req, res, next) {
	try {
		validationResult(req).throw();
		console.log ("GET /resource/"+ req.params.id);
		console.log (req.params.id);
		models.Resource.findById (req.params.id)
		.then (function (resource) {
			res.status(200).json(resource);
		})
		.catch (function(error) {
			res.status(400).json(error);
		});
	}
	catch(err) {
		console.log (req.params.id);
		res.status(400).json({"400": "very bad request"});
	}
});

/**
 * @swagger
 * /resource:
 *   post:
 *     tags:
 *       - resource
 *     description: Creates a new resource 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: resource name 
 *         description: resource object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/resource'
 *     responses:
 *       201:
 *         description: Successfully created
 */
router.post ('/', [ body('name').isAlpha(), body('displayName').isAlpha(), body('technicalName').isAlpha() ], function (req, res, next) {
	try {
		validationResult(req).throw();
		console.log (req.body.name);
		console.log (req.body.displayName);
		console.log (req.body.technicalName);
		console.log (req.body.resourceOwner);
		console.log (req.body.resourceManager);
		models.Resource.create ({
			id: uuidv4(),
			NAME: req.body.name,
			DISPLAYNAME: req.body.displayName,
			TECHNICALNAME: req.body.technicalName,
			STATUS: req.body.status,
			RESOURCEOWNER: req.body.resourceOwner,
			RESOURCEMANAGER: req.body.resourceManager,
			ARCHITECTE: req.body.architecte
		})
		.then (function(resource) {
			res.status(201).json(resource);
		})
		.catch (function (error) {
			res.status(404).json({"404": error});
		});
	}
	catch(err) {
		res.status(400).json({"400":"bad request"});
	}
});

module.exports = router;
