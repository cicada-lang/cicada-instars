"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.do_ap = void 0;
const Exp = __importStar(require("../exp"));
const Value = __importStar(require("../value"));
const Normal = __importStar(require("../normal"));
const Neutral = __importStar(require("../neutral"));
const Closure = __importStar(require("../closure"));
const Trace = __importStar(require("../../trace"));
function do_ap(target, arg) {
    if (target.kind === "Value.fn") {
        return Closure.apply(target.closure, arg);
    }
    else if (target.kind === "Value.reflection") {
        if (target.t.kind === "Value.pi") {
            return Value.reflection(Closure.apply(target.t.closure, arg), Neutral.ap(target.neutral, new Normal.Normal(target.t.arg_t, arg)));
        }
        else {
            throw new Trace.Trace(Exp.explain_elim_target_type_mismatch({
                elim: "ap",
                expecting: ["Value.pi"],
                reality: target.t.kind,
            }));
        }
    }
    else {
        throw new Trace.Trace(Exp.explain_elim_target_mismatch({
            elim: "ap",
            expecting: ["Value.fn", "Value.reflection"],
            reality: target.kind,
        }));
    }
}
exports.do_ap = do_ap;