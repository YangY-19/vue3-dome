import { get } from '../axios/request'

export function getSlideshow () {
    return get({
        url: '/slideshow'
    })
}
