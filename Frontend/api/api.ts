import axios from 'axios'
import { Platform } from 'react-native'
import { IP } from './constants'

const isWeb = Platform.OS === 'web'
let base = null

if(isWeb) {
    base = 'http://localhost:8080'
} else {
    base = IP
}

const api = axios.create({
    baseURL: base
})

export default api