const Packet = require('../packet'); // eslint-disable-line no-unused-vars
const PacketV0 = require('../packetv0'); // eslint-disable-line no-unused-vars
const PacketV1 = require('../packetv1'); // eslint-disable-line no-unused-vars
const RMCMessage = require('../rmc'); // eslint-disable-line no-unused-vars
const Stream = require('../stream');

const Requests = require('./requests/service_item');
const Responses = require('./responses/service_item');

class ServiceItem {
	static ProtocolID = 0x77;

	static ProtocolName = 'Service Item';

	static Methods = {
		GetEnvironment: 0x01,
		HttpGetRequest: 0x02,
		HttpGetResponse: 0x03,
		PurchaseServiceItemRequest: 0x04,
		PurchaseServiceItemResponse: 0x05,
		ListServiceItemRequest: 0x06,
		ListServiceItemResponse: 0x07,
		GetBalanceRequest: 0x08,
		GetBalanceResponse: 0x09,
		GetPrepurchaseInfoRequest: 0x0a,
		GetPrepurchaseInfoResponse: 0x0b,
		GetServiceItemRightRequest: 0x0c,
		GetServiceItemRightResponse: 0x0d,
		GetPurchaseHistoryRequest: 0x0e,
		GetPurchaseHistoryResponse: 0x0f,
		PostRightBinaryByAccount: 0x10,
		UseServiceItemByAccountRequest: 0x11,
		UseServiceItemByAccountResponse: 0x12,
		AcquireServiceItemByAccount: 0x13,
		GetSupportId: 0x14,
		GetLawMessageRequest: 0x15,
		GetLawMessageResponse: 0x16,
	};

	static MethodNames = Object.entries(ServiceItem.Methods).reduce((namesObject, entry) => {
		const [key, value] = entry;
		namesObject[value] = key;
		return namesObject;
	}, {});

	static Handlers = {
		0x01: ServiceItem.GetEnvironment,
		0x02: ServiceItem.HttpGetRequest,
		0x03: ServiceItem.HttpGetResponse,
		0x04: ServiceItem.PurchaseServiceItemRequest,
		0x05: ServiceItem.PurchaseServiceItemResponse,
		0x06: ServiceItem.ListServiceItemRequest,
		0x07: ServiceItem.ListServiceItemResponse,
		0x08: ServiceItem.GetBalanceRequest,
		0x09: ServiceItem.GetBalanceResponse,
		0x0a: ServiceItem.GetPrepurchaseInfoRequest,
		0x0b: ServiceItem.GetPrepurchaseInfoResponse,
		0x0c: ServiceItem.GetServiceItemRightRequest,
		0x0d: ServiceItem.GetServiceItemRightResponse,
		0x0e: ServiceItem.GetPurchaseHistoryRequest,
		0x0f: ServiceItem.GetPurchaseHistoryResponse,
		0x10: ServiceItem.PostRightBinaryByAccount,
		0x11: ServiceItem.UseServiceItemByAccountRequest,
		0x12: ServiceItem.UseServiceItemByAccountResponse,
		0x13: ServiceItem.AcquireServiceItemByAccount,
		0x14: ServiceItem.GetSupportId,
		0x15: ServiceItem.GetLawMessageRequest,
		0x16: ServiceItem.GetLawMessageResponse
	};

	/**
	 *
	 * @param {(Packet|PacketV0|PacketV1)} packet PRUDP packet
	 */
	static handlePacket(packet) {
		const methodId = packet.rmcMessage.methodId;

		const handler = ServiceItem.Handlers[methodId];

		if (!handler) {
			console.log(`Unknown Service Item method ID ${methodId} (0x${methodId?.toString(16)}) (${ServiceItem.MethodNames[methodId]})`);
			return;
		}

		const { rmcMessage } = packet;
		const stream = new Stream(rmcMessage.body, packet.connection);

		packet.rmcData = {
			body: handler(rmcMessage, stream)
		};
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetEnvironment(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetEnvironmentRequest(stream);
		} else {
			return new Responses.GetEnvironmentResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static HttpGetRequest(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.HttpGetRequestRequest(stream);
		} else {
			return new Responses.HttpGetRequestResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static HttpGetResponse(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.HttpGetResponseRequest(stream);
		} else {
			return new Responses.HttpGetResponseResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static PurchaseServiceItemRequest(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.PurchaseServiceItemRequestRequest(stream);
		} else {
			return new Responses.PurchaseServiceItemRequestResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static PurchaseServiceItemResponse(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.PurchaseServiceItemResponseRequest(stream);
		} else {
			return new Responses.PurchaseServiceItemResponseResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ListServiceItemRequest(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.ListServiceItemRequestRequest(stream);
		} else {
			return new Responses.ListServiceItemRequestResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static ListServiceItemResponse(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.ListServiceItemResponseRequest(stream);
		} else {
			return new Responses.ListServiceItemResponseResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetBalanceRequest(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetBalanceRequestRequest(stream);
		} else {
			return new Responses.GetBalanceRequestResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetBalanceResponse(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetBalanceResponseRequest(stream);
		} else {
			return new Responses.GetBalanceResponseResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetPrepurchaseInfoRequest(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetPrepurchaseInfoRequestRequest(stream);
		} else {
			return new Responses.GetPrepurchaseInfoRequestResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetPrepurchaseInfoResponse(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetPrepurchaseInfoResponseRequest(stream);
		} else {
			return new Responses.GetPrepurchaseInfoResponseResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetServiceItemRightRequest(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetServiceItemRightRequestRequest(stream);
		} else {
			return new Responses.GetServiceItemRightRequestResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetServiceItemRightResponse(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetServiceItemRightResponseRequest(stream);
		} else {
			return new Responses.GetServiceItemRightResponseResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetPurchaseHistoryRequest(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetPurchaseHistoryRequestRequest(stream);
		} else {
			return new Responses.GetPurchaseHistoryRequestResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetPurchaseHistoryResponse(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetPurchaseHistoryResponseRequest(stream);
		} else {
			return new Responses.GetPurchaseHistoryResponseResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static PostRightBinaryByAccount(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.PostRightBinaryByAccountRequest(stream);
		} else {
			return new Responses.PostRightBinaryByAccountResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UseServiceItemByAccountRequest(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UseServiceItemByAccountRequestRequest(stream);
		} else {
			return new Responses.UseServiceItemByAccountRequestResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static UseServiceItemByAccountResponse(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.UseServiceItemByAccountResponseRequest(stream);
		} else {
			return new Responses.UseServiceItemByAccountResponseResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static AcquireServiceItemByAccount(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.AcquireServiceItemByAccountRequest(stream);
		} else {
			return new Responses.AcquireServiceItemByAccountResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetSupportId(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetSupportIdRequest(stream);
		} else {
			return new Responses.GetSupportIdResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetLawMessageRequest(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetLawMessageRequestRequest(stream);
		} else {
			return new Responses.GetLawMessageRequestResponse(stream);
		}
	}

	/**
	 *
	 * @param {RMCMessage} rmcMessage NEX RMC message
	 * @param {Stream} stream NEX data stream
	 * @returns {object} Parsed RMC body
	 */
	static GetLawMessageResponse(rmcMessage, stream) {
		if (rmcMessage.isRequest()) {
			return new Requests.GetLawMessageResponseRequest(stream);
		} else {
			return new Responses.GetLawMessageResponseResponse(stream);
		}
	}
}


module.exports = ServiceItem;
