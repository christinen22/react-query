import axios from "axios";
import { ICatResponse, ICat } from "../types";

const FAKE_DELAY = 1500

const instance = axios.create({
    baseURL: "https://api.thecatapi.com/v1",
    timeout: 10000,
    headers: {
        api_key: "live_CJdSyhMauSuiI0X2U7ce8c2Y6zhV5etdtkwF2i0KD6piJc1QVnmPxxTgK7D50rHP"
    }
})

const get = async <T>(endpoint: string) => {
    const res = await instance.get<T>(endpoint)

    //Simulate a delay
    !!FAKE_DELAY && await new Promise(r => setTimeout(r, FAKE_DELAY))

    return res.data
}
/**
 * Get random cat image
 */

export const getRandomCat = async () => {
    const data = await get<ICatResponse>("/images/search")

    return data[0]
}

/**
 * Get random cat based on breed
 */

export const getCatBreed = async (breed: string) => {
    const data = await get<ICatResponse>(`/images/search/?breed_ids=${breed}`)

    return data[0]
}

