BRAID := braid
DINGUS := $(BRAID)/dingus
RESOURCES := ssc.bundle.js dingus.css codemirror.css

.PHONY: all
all: $(RESOURCES:%=rsrc/%) node_modules assets

rsrc/%: $(DINGUS)/%
	@mkdir -p rsrc
	cp $< $@

# Currently, the assets are at the root to avoid hard-coding a path.
assets: $(DINGUS)/assets
	rm -rf $@
	cp -r $< $@

node_modules:
	yarn

# For building the dingus itself, from which we get our resources.
.PHONY: dingus
dingus:
	cd $(BRAID) ; make dingus
