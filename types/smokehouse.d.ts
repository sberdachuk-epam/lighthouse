/**
 * @license Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

 declare module Smokehouse {
  interface ExpectedLHR {
    audits: Record<string, any>;
    requestedUrl: string;
    finalUrl: string;
    runWarnings?: Array<string|RegExp>;
    runtimeError?: {
      code?: any;
      message?: any;
    };
  }

  export type ExpectedRunnerResult = {
    lhr: ExpectedLHR,
    artifacts?: Partial<Record<keyof LH.Artifacts, any>>
  }

  export interface TestDfn {
    id: string;
    expectations: ExpectedRunnerResult[];
    config?: LH.Config.Json;
    /** If test is performance sensitive, set to true so that it won't be run parallel to other tests. */
    runSerially?: boolean;
  }

  export interface FirehouseOptions {
    runLighthouse: (url: string, config?: LH.Config.Json) => Promise<Omit<LH.RunnerResult, 'report'>>;
    urlFilterRegex?: RegExp;
    skip?: (test: TestDfn, expectation: ExpectedRunnerResult) => string | false;
    modify?: (test: TestDfn, expectation: ExpectedRunnerResult) => void;
  }
}
