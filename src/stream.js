const Connection = require('./connection'); // eslint-disable-line no-unused-vars
const NEXTypes = require('./types');

class Stream {
	/**
	 * 
	 * @param {Buffer} buffer Buffer object
	 * @param {Connection} connection NEX connection
	 */
	constructor(buffer, connection) {
		this.connection = connection; // Used for NEX type settings
		this._buffer = buffer;
		this._offset = 0;
	}

	/**
	 *
	 * @returns {boolean} True if has data left to read
	 */
	hasDataLeft() {
		return this._offset < this._buffer.length;
	}

	/**
	 *
	 * @returns {number} Bytes left in the stream from current position
	 */
	remaining() {
		return this._buffer.length - this._offset;
	}

	/**
	 *
	 * @param {number} value Bytes to skip
	 */
	skip(value) {
		this._offset += value;
	}

	/**
	 *
	 * @param {number} len Bytes to read
	 * @returns {Buffer} Read bytes
	 */
	read(len) {
		const read = this._buffer.subarray(this._offset, this._offset + len);
		this._offset += len;

		return read;
	}

	/**
	 *
	 * @param {number} len Bytes to read
	 * @returns {Buffer} Read bytes
	 */
	readBytes(len) {
		return this.read(len);
	}

	/**
	 *
	 * @returns {Buffer} Rest of the stream from current offset
	 */
	readRest() {
		return this.readBytes(this.remaining());
	}

	/**
	 *
	 * @returns {number} Read number
	 */
	readUInt8() {
		return this.readBytes(1).readUInt8();
	}

	/**
	 *
	 * @returns {number} Read number
	 */
	readInt8() {
		return this.readBytes(1).readInt8();
	}

	/**
	 *
	 * @returns {number} Read number
	 */
	readUInt16BE() {
		return this.readBytes(2).readUInt16BE();
	}

	/**
	 *
	 * @returns {number} Read number
	 */
	readUInt16LE() {
		return this.readBytes(2).readUInt16LE();
	}

	/**
	 *
	 * @returns {number} Read number
	 */
	readInt16BE() {
		return this.readBytes(2).readInt16BE();
	}

	/**
	 *
	 * @returns {number} Read number
	 */
	readInt16LE() {
		return this.readBytes(2).readInt16LE();
	}

	/**
	 *
	 * @returns {number} Read number
	 */
	readUInt32BE() {
		return this.readBytes(4).readUInt32BE();
	}

	/**
	 *
	 * @returns {number} Read number
	 */
	readUInt32LE() {
		return this.readBytes(4).readUInt32LE();
	}

	/**
	 *
	 * @returns {number} Read number
	 */
	readInt32BE() {
		return this.readBytes(4).readInt32BE();
	}

	/**
	 *
	 * @returns {number} Read number
	 */
	readInt32LE() {
		return this.readBytes(4).readInt32LE();
	}

	/**
	 *
	 * @returns {number} Read number
	 */
	readUInt64BE() {
		return this.readBytes(8).readBigUInt64BE();
	}

	/**
	 *
	 * @returns {number} Read number
	 */
	readUInt64LE() {
		return this.readBytes(8).readBigUInt64LE();
	}

	/**
	 *
	 * @returns {number} Read number
	 */
	readInt64BE() {
		return this.readBytes(8).readBigInt64BE();
	}

	/**
	 *
	 * @returns {number} Read number
	 */
	readInt64LE() {
		return this.readBytes(8).readBigInt64LE();
	}

	/**
	 *
	 * @returns {boolean} Read boolean
	 */
	readBoolean() {
		return Boolean(this.readUInt8());
	}

	/**
	 * @returns {string} NEX string
	 */
	readNEXString() {
		const length = this.readUInt16LE();
		const string = this.readBytes(length);

		return string.toString().replace(/\0/g, '');
	}

	/**
	 * @returns {Buffer} NEX Buffer
	 */
	readNEXBuffer() {
		const length = this.readUInt32LE();

		return this.readBytes(length);
	}

	/**
	 * @returns {Buffer} NEX qBuffer
	 */
	readNEXQBuffer() {
		const length = this.readUInt16LE();

		return this.readBytes(length);
	}

	/**
	 *
	 * @param {(Function|NEXTypes.Structure)} input Function to be ran or Structure to be parsed x times. x=list length
	 * @returns {Array} NEX List<input>
	 */
	readNEXList(input) {
		const list = [];

		const length = this.readUInt32LE();

		for (let i = 0; i < length; i++) {
			if (input.prototype instanceof NEXTypes.Structure) {
				list.push(this.readNEXStructure(input));
			} else {
				list.push(input.call(this));
			}
		}

		return list;
	}

	/**
	 *
	 * @returns {NEXTypes.StationURL} NEX StationURL
	 */
	readNEXStationURL() {
		return new NEXTypes.StationURL(this.readNEXString());
	}

	/**
	 *
	 * @returns {number} NEX DateTime
	 */
	readNEXDateTime() {
		// TODO - Return a NEXTypes.DateTime
		return this.readUInt64LE();
	}

	/**
	 *
	 * @returns {NEXTypes.Result} NEX Result
	 */
	readNEXResult() {
		return new NEXTypes.Result(this.readUInt32LE());
	}

	/**
	 *
	 * @param {NEXTypes.Structure} cls NEX Structure definition
	 * @returns {NEXTypes.Structure} Extracted NEX Structure
	 */
	readNEXStructure(cls) {
		const instance = new cls();
		instance.extract(this);

		return instance;
	}

	/**
	 *
	 * @returns {NEXTypes.Structure} Extracted NEX Structure
	 */
	readNEXAnyDataHolder() {
		return this.readNEXStructure(NEXTypes.AnyDataHolder).data;
	}
}

module.exports = Stream;