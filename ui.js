// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "词 " + (spec.words || []).length + " 个，点按钮算长度中位数。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.sorted.forEach(function (size, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = "第 " + (spot + 1) + " 短";
      row.appendChild(head);
      const bar = document.createElement("span");
      bar.className = "bar";
      const fill = document.createElement("i");
      fill.style.width = Math.min(100, size * 15) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
      const mark = document.createElement("span");
      mark.className = "chip ok";
      mark.textContent = size + " 个字符";
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "中位数 " + view.median + "，最短 " + view.shortest + "，最长 " + view.longest;
    parts.log.textContent = "词数 " + view.count + "（" + (view.odd ? "奇数" : "偶数") + "个）";
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "算中位数";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "追加一个词";
  addButton.addEventListener("click", function () {
    spec.words = (spec.words || []).concat(["zulu"]);
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一个";
  dropButton.addEventListener("click", function () {
    spec.words = (spec.words || []).slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一个词";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "sevench";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { words: (spec.words || []).concat([box.value]) }));
      parts.out.textContent = "加入后中位数 " + view.median;
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看中位数";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "中位数 " + view.median + "，词数 " + view.count;
  });
  parts.controls.appendChild(readButton);

  draw();
}
