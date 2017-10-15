BRAID := braid
DINGUS := $(BRAID)/dingus
RESOURCES := ssc.bundle.js dingus.css codemirror.css

.PHONY: all
all: $(RESOURCES:%=rsrc/%) node_modules

rsrc/%: $(DINGUS)/%
	@mkdir -p rsrc
	cp $< $@

node_modules:
	yarn

# For building the dingus itself, from which we get our resources.
.PHONY: dingus
dingus:
	cd $(BRAID) ; make dingus
