CREATE PROCEDURE IF NOT EXISTS InsertSettings()
BEGIN
  DELETE FROM `settings` WHERE `key` = 'student_seminar';
  SET @html = '<p>Some requirements for the report</p>
                <ol>
                  <li>
                    Seminar Schedule:
                    <ul>
                      <li>The seminar will be conducted over one or two days.</li>
                      <li>
                        Each participant must be prepared to present on the first day, including
                        delivering their report, to ensure fairness.
                      </li>
                      <li>
                        Presentation sequence will be randomly assigned. If first-day
                        presentations are canceled, some second-day presentations may shift to
                        the first day.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Presentation Guidelines ({{SEMINAR_DURATION}} minutes):
                    <ul>
                      <li>Aim for a concise {{SEMINAR_DURATION}}-minute presentation.</li>
                      <li>
                        Structure your presentation:
                        <ul>
                          <li>Brief introduction of the company.</li>
                          <li>Detailed discussion of your tasks (main subject).</li>
                          <li>Summarize your practical experiences and assess their value.</li>
                        </ul>
                      </li>
                      <li>
                        Ensure clarity:
                        <ul>
                          <li>
                            Structure your content for easy understanding by all participants.
                          </li>
                          <li>Explain any abbreviations used.</li>
                        </ul>
                      </li>
                      <li>
                        Slide Tips:
                        <ul>
                          <li>
                            Include a title page with your main topic, name, company name,
                            university, and presentation date.
                          </li>
                          <li>
                            Limit each slide to five key points.
                          </li>
                          <li>
                            Use at least 20-point font size, ensuring readability
                            from all rows.
                          </li>
                        </ul>
                      </li>
                </ol>';
  INSERT INTO `settings` (`key`, `value`) VALUES ('student_seminar', @html);

  DELETE FROM `settings` WHERE `key` = 'student_report';
  SET @html = '<p>Some requirements for the report</p>
                <ol>
                  <li>
                    Length: Your report should be between {{REPORT_MIN_LENGTH}} to {{REPORT_MAX_LENGTH}} pages, adjusted based on the number of figures included.
                  </li>
                  <li>
                    Structure: Divide your report into sections covering the company overview, main topics, and summary.
                  </li>
                  <li>
                    Clarity and Organization: Ensure the report is well-structured and easy to understand.
                  </li>
                  <li>
                    References: Include proper references for all information sourced from external materials.
                  </li>
                  <li>
                    Formatting: Use a {{REPORT_FORMAT_SIZE}}-point {{REPORT_FORMAT_FONT}} font.
                  </li>
                  <li>
                    Pagination: Number all pages of the report.
                  </li>
                  <li>
                    Presentation: Bind your report before submission; avoid submitting loose sheets or individually wrapped pages.
                  </li>
                </ol>';
  INSERT INTO `settings` (`key`, `value`) VALUES ('student_report', @html);

  DELETE FROM `settings` WHERE `key` = 'student_steps';
  SET @html = '<p>There are a few things you need to keep in mind about this internship</p>
                <ol> 
                  <li>Duration: The internship spans 14 weeks and requires full-time commitment.</li>
                  <li>Before the Internship:
                    <ul>
                      <li>Submit your transcript records to the system.</li>
                      <li>Wait for confirmation within 5-7 days.</li>
                      <li>Submit a draft job description to the system for program relevance verification.</li>
                    </ul>
                  </li>
                  <li>Beginning of the Internship:
                    <ul>
                      <li>Submit your internship confirmation form to the system within 2 weeks of job description approval.</li>
                      <li>The system calculates your internship duration from the confirmation date.</li>
                      <li>Failure to submit on time will result in uncounted weeks of work.</li>
                      <li>Ensure the confirmation form includes:
                        <ul>
                          <li>Position name, tasks, and schedule.</li>
                          <li>Signature and stamp of the employing company.</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>End of the Internship:
                    <ul>
                      <li>Submit a work report and receive an evaluation/confirmation/certificate from the company.</li>
                      <li>Use either your company\'s form or the CSE Department\'s form.</li>
                      <li>Both documents must be signed and stamped by your company.</li>
                      <li>A seminar will be held upon successful submission of all required documents.</li>
                    </ul>
                  </li>
                </ol>';
  INSERT INTO `settings` (`key`, `value`) VALUES ('student_steps', @html);
END$$