/**
 * @typedef {import('../../stream')} Stream
 */

class GetRivTokenResponse {
	/**
	 * @param {Stream} stream NEX data stream
	 */
	constructor(stream) {
		this.pRivToken = stream.readNEXString();
	}

	toJSON() {
		return {
			pRivToken: {
				__typeName: 'String',
				__typeValue: this.pRivToken
			}
		};
	}
}

class PostPlayLogResponse {
	// * Returns nothing
	toJSON() {
		return {};
	}
}

module.exports = {
	GetRivTokenResponse,
	PostPlayLogResponse
};
