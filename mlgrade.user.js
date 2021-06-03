// ==UserScript==
// @name         MLGrade
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Calculate grade out of total points
// @author       soulsen
// @match        https://sis.sanjuan.edu/StudentPortal/Home/PortalMainPage
// @require      http://code.jquery.com/jquery-3.6.0.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const ptsPossibleColumn = 4
    const scoresColumn = 5
    const gradedColumn = 8
    const periods = [...Array(6).keys()];

    var checkLoaded = setInterval(function() {
        if ($('#tblassign_6 > tbody').length) {
            periods.forEach(period => {
                period += 1

                var ptsPossibleTotal = 0
                var totalScore = 0
                var table = document.querySelector(`#tblassign_${period} > tbody`);

                for (var x = 0; x < table.rows.length; x++) {
                    var ptsPossible = parseFloat(table.rows[x].cells[ptsPossibleColumn].textContent);
                    var score = table.rows[x].cells[scoresColumn].textContent === "" ? 0 : parseFloat(table.rows[x].cells[scoresColumn].textContent)

                    if(table.rows[x].cells[gradedColumn].querySelector("img") === null) {
                        ptsPossibleTotal += ptsPossible
                        totalScore += score
                    }
                }

                document.querySelector(`#capPer_${period}`).innerText += " | " + totalScore.toString() + "/" + ptsPossibleTotal.toString()
            })

           clearInterval(checkLoaded);
        }
     }, 100);
})();
