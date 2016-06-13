// Generated by CoffeeScript 1.10.0
(function() {
  var Data, HmtxTable, Table,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Table = require('../table');

  Data = require('../../data');

  HmtxTable = (function(superClass) {
    extend(HmtxTable, superClass);

    function HmtxTable() {
      return HmtxTable.__super__.constructor.apply(this, arguments);
    }

    HmtxTable.prototype.tag = 'hmtx';

    HmtxTable.prototype.parse = function(data) {
      var i, j, k, last, lsbCount, m, ref, ref1, results;
      data.pos = this.offset;
      this.metrics = [];
      for (i = j = 0, ref = this.file.hhea.numberOfMetrics; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        this.metrics.push({
          advance: data.readUInt16(),
          lsb: data.readInt16()
        });
      }
      lsbCount = this.file.maxp.numGlyphs - this.file.hhea.numberOfMetrics;
      this.leftSideBearings = (function() {
        var k, ref1, results;
        results = [];
        for (i = k = 0, ref1 = lsbCount; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
          results.push(data.readInt16());
        }
        return results;
      })();
      this.widths = (function() {
        var k, len, ref1, results;
        ref1 = this.metrics;
        results = [];
        for (k = 0, len = ref1.length; k < len; k++) {
          m = ref1[k];
          results.push(m.advance);
        }
        return results;
      }).call(this);
      last = this.widths[this.widths.length - 1];
      results = [];
      for (i = k = 0, ref1 = lsbCount; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
        results.push(this.widths.push(last));
      }
      return results;
    };

    HmtxTable.prototype.forGlyph = function(id) {
      var metrics;
      if (id in this.metrics) {
        return this.metrics[id];
      }
      return metrics = {
        advance: this.metrics[this.metrics.length - 1].advance,
        lsb: this.leftSideBearings[id - this.metrics.length]
      };
    };

    HmtxTable.prototype.encode = function(mapping) {
      var id, j, len, metric, table;
      table = new Data;
      for (j = 0, len = mapping.length; j < len; j++) {
        id = mapping[j];
        metric = this.forGlyph(id);
        table.writeUInt16(metric.advance);
        table.writeUInt16(metric.lsb);
      }
      return table.data;
    };

    return HmtxTable;

  })(Table);

  module.exports = HmtxTable;

}).call(this);
