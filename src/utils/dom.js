export function hasParent(dom, parentDom) {
	parentDom = Array.isArray(parentDom) ? parentDom: [parentDom]
	while(dom) {
		if (parentDom.find(p => p === dom)) {
			return true
		}else {
			dom = dom.parentNode
		}
	}
} 