#!/usr/bin/env node
const Extract = require('./Extract'),
	program = require('commander');

program
	.option('-r --role-name <type>', 'IAM Role name to extract.')
	.option('-y', 'Output in YAML format.')
	.option('-j', 'Output in JSON format.');

program.parse(process.argv);

async function run() {
	const extractor = new Extract(program.roleName);
	let resource;

	try {
		resource = await extractor.extract(program.roleName);
	} catch (e) {
		console.error('Failed extracting role:', e.message);
		process.exit(1);
	}

	if (program.J) {
		console.log('\n', JSON.stringify(resource, null, 2));
	}

	if (program.Y || (!program.Y && !program.J)) {
		console.log('\n', extractor.toYaml(resource));
	}
}

run();
