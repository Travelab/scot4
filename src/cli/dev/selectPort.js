import portfinder from 'portfinder'

export default function (startPort = 5563) {
  portfinder.basePort = startPort

  return Promise.promisify(portfinder.getPort)()
}
