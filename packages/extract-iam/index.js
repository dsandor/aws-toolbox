import Extract from './Extract';
import { option, parse, roleName, J, Y } from 'commander';

option('-r --role-name <type>', 'IAM Role name to extract.')
	.option('-y', 'Output in YAML format.')
	.option('-j', 'Output in JSON format.');

parse(process.argv);

async function run() {
	const extractor = new Extract(roleName);
	let resource;

	try {
		resource = await extractor.extract(roleName);
	} catch (e) {
		console.error('Failed extracting role:', e.message);
		process.exit(1);
	}

	if (J) {
		console.log('\n', JSON.stringify(resource, null, 2));
	}

	if (Y || (!Y && !J)) {
		console.log('\n', extractor.toYaml(resource));
	}
}

run();
