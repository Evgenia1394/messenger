import { expect } from 'chai';
import sinon from 'sinon';
import { HTTPTransport } from './HTTPTransport';

describe('HTTPTransport class', () => {
  const requests: sinon.SinonFakeXMLHttpRequest[] = [];
  const originalXHR = global.XMLHttpRequest;

  beforeEach(() => {
    const XHR = sinon.useFakeXMLHttpRequest();
    // @ts-ignore
    global.XMLHttpRequest = XHR;

    XHR.onCreate = (xhr) => {
      requests.push(xhr);
    };
  });

  afterEach(() => {
    requests.length = 0;
  });

  after(() => {
    global.XMLHttpRequest = originalXHR;
  });

  const transport = new HTTPTransport();

  it('should make GET request', () => {
    // act
    transport.get('/login');
    const request = requests[0];
    // assert
    expect(request.method.toUpperCase()).to.eq('GET');
  });

  it('should true url', () => {
    // arrange
    const mockurl = 'https://ya-praktikum.tech/api/v2/user';
    // act
    transport.get('/user');
    const request = requests[0];
    // assert
    expect(request.url).to.eq(mockurl);
  });

  it('should be an instance of FormData', () => {
    // arrange
    const formData = new FormData();
    // act
    transport.put('/user/profile/avatar', {
      timeout: 5000,
      data: formData,
    });
    const request = requests[0];
    // assert
    expect(request.requestBody.constructor.name).to.equal('FormData');
  });
});
