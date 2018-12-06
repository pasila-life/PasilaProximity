const noble = require('noble')
const express  = require('express')

const devices = new Map()

const app = express()

app.get('/devices', (req, res) => {
  res.json(Array.from(devices.values()))
})

function startScanning() {
  noble.startScanning()
  noble.on('discover', peripheral => {
    console.log(peripheral.address)
    const {id, uuid, advertisement} = peripheral
    devices.set(peripheral.uuid, {
      id,
      uuid,
      advertisement: {
        manefacturerData: advertisement.manufacturerData ? advertisement.manufacturerData.toString('utf8') : null,
        localName: advertisement.localName ? advertisement.localName.toString('utf8') : null
      }
    })
  })
}

startScanning()

app.listen(3000)


