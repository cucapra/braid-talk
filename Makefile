BRAID := braid
DINGUS := $(BRAID)/dingus
RESOURCES := ssc.bundle.js dingus.css codemirror.css

.PHONY: all
all: $(RESOURCES:%=rsrc/%)

rsrc/%: $(DINGUS)/%
	@mkdir -p rsrc
	cp $< $@

$(REVEALJS):
	bower install reveal.js
	touch $@

$(HIGHLIGHTJS):
	bower install highlight-js
	touch $@

# For building the dingus itself, from which we get our resources.
.PHONY: dingus
dingus:
	cd $(BRAID) ; make dingus
