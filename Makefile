BRAID := braid
DINGUS := $(BRAID)/dingus
RESOURCES := ssc.bundle.js dingus.css codemirror.css
REVEAL := node_modules/reveal.js/package.json

.PHONY: all
all: $(RESOURCES:%=rsrc/%) $(REVEAL)

rsrc/%: $(DINGUS)/%
	@mkdir -p rsrc
	cp $< $@

$(REVEAL):
	yarn

# For building the dingus itself, from which we get our resources.
.PHONY: dingus
dingus:
	cd $(BRAID) ; make dingus
