const AWS = require('aws-sdk'),
  camelCase = require('camelcase'),
  yaml = require('json-to-pretty-yaml');

class Extract {
	constructor(iamRoleName, omitRoleName = false) {
		this.roleName = iamRoleName;
		this.omitRoleName = omitRoleName;
	}

	async extract() {
		const iam = new AWS.IAM();

		const role = await iam.getRole({ RoleName: this.roleName }).promise();
		
		if (!role || !role.Role) {
			throw new Error(`Role with the name '${this.roleName}' was not found.`);
		}

		return this.convertExportedJsonToResource(role.Role);
	}

	convertExportedJsonToResource(role, omitRoleName = this.omitRoleName) {
		const roleName = role.Arn.split('/').pop();
		const resourceName = camelCase(roleName, { pascalCase: true });
		const resource = {
			[resourceName]: {
				Type: 'AWS::IAM::Role',
				Properties: {
					Description: role.Description,
					AssumeRolePolicyDocument: JSON.parse( decodeURIComponent(role.AssumeRolePolicyDocument)),
					RoleName: roleName,
					Path: role.Path,
					MaxSessionDuration: role.MaxSessionDuration,
				}
      },
		};
		
		if (omitRoleName) delete resource[resourceName].Properties.RoleName;

		return resource;
	}

	toYaml(resourceObject) {
		return yaml.stringify(resourceObject);
	}
}

module.exports = Extract;