const AWS = require('aws-sdk'),
  camelCase = require('camelcase'),
  yaml = require('json-to-pretty-yaml');

class Extract {
	constructor(iamRoleName) {
		this.roleName = iamRoleName;
	}

	async extract() {
		const iam = new AWS.IAM();

		const role = await iam.getRole({ RoleName: this.roleName }).promise();
		
		if (!role) {
			throw new Error(`Role with the name '${this.roleName}' was not found.`);
		}

		return this.convertExportedJsonToResource(role.Role);
	}

	convertExportedJsonToResource(role) {
		const roleName = role.Arn.split('/').pop();
		const resourceName = camelCase(roleName, { pascalCase: true });
		const resource = {
      [resourceName]: {
        Description: role.Description,
				AssumeRolePolicyDocument: JSON.parse( decodeURIComponent(role.AssumeRolePolicyDocument)),
				RoleName: roleName,
				Path: role.Path,
				MaxSessionDuration: role.MaxSessionDuration,
      },
		};
		
		return resource;
	}

	toYaml(resourceObject) {
		return yaml.stringify(resourceObject);
	}
}

module.exports = Extract;