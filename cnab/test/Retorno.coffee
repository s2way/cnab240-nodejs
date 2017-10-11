Retorno = require '../src/Retorno'
expect = require 'expect.js'

describe 'Retorno.js', ->

    describe 'when a new instance is created', ->

        Retorno = null

        beforeEach ->
            Retorno = require '../src/Retorno'

        it 'should throw an exception if no type is passed', ->

            expect(Retorno).to.throwError /Bank is mandatory/

        it 'should throw an exception if no bank is passed', ->

            expect(Retorno).withArgs('HSBC').to.throwError /Type is mandatory/

        it 'should create the instance if all params have been passed', ->

            expect(Retorno).withArgs('HSBC', 'Pagamento').not.to.throwError()

    describe 'when extracting file data', ->

        #coffeelint: disable=no_trailing_whitespace

        exampleRetornoSingle = """
            23700000         2071444070001310000317324          0350760000000003646 VERSUL TECNOLOGIA             BANCO BRADESCO S.A.                     2091020171654260000010890000000000000BRAD                                                         
            23700011C2041045 2071444070001310000317324          0350760000000003646 VERSUL TECNOLOGIA                                                     Rua Marcilio Dias             1659                Novo Hamburgo       93410185RS01      HF        
            2370001300001A0000180410067500000604101404 STACIONE ROTATIVO LTDA EPP    5e74ba0fe5f88025d04f09102017BRL0000000000000000000000000865505e74ba0fe5f88025d04f09102017000000000000000                                          00010     05THF      
            2370001300002B   206200940000291                                                                                     00000000  09102017000000000086550000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
            23700015         000008000000000000110750000000000000000000000000                                                                                                                                                                               
            23799999         000001000006                                                                                                                                                                                                                   

"""

        exampleRetornoTwoLots = """
            23700000         2071444070001310000317324          0350760000000003646 VERSUL TECNOLOGIA             BANCO BRADESCO S.A.                     2091020171654260000010890000000000000BRAD                                                         
            23700011C2041045 2071444070001310000317324          0350760000000003646 VERSUL TECNOLOGIA                                                     Rua Marcilio Dias             1659                Novo Hamburgo       93410185RS01      HF        
            2370001300001A0000180410067500000604101404 STACIONE ROTATIVO LTDA EPP    5e74ba0fe5f88025d04f09102017BRL0000000000000000000000000865505e74ba0fe5f88025d04f09102017000000000000000                                          00010     05THF      
            2370001300002B   206200940000291                                                                                     00000000  09102017000000000086550000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
            23700015         000008000000000000110750000000000000000000000000                                                                                                                                                                               
            23700021C2041045 2071444070001310000317324          0350760000000003646 VERSUL TECNOLOGIA                                                     Rua Marcilio Dias             1659                Novo Hamburgo       93410185RS01      HF        
            2370001300001A0000180410067500000604101404 OUTRO NOME DO MESMO TAMANHO   5e74ba0fe5f88025d04f09102017BRL0000000000000000000000000865505e74ba0fe5f88025d04f09102017000000000000000                                          00010     05THF      
            2370001300002B   206200940000291                                                                                     00000000  09102017000000000086550000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
            23700015         000008000000000000110750000000000000000000000000                                                                                                                                                                               
            23799999         000002000006                                                                                                                                                                                                                   

        """

        exampleRetornoThreeDetails = """
            23700000         2071444070001310000317324          0350760000000003646 VERSUL TECNOLOGIA             BANCO BRADESCO S.A.                     2091020171654260000010890000000000000BRAD                                                         
            23700011C2041045 2071444070001310000317324          0350760000000003646 VERSUL TECNOLOGIA                                                     Rua Marcilio Dias             1659                Novo Hamburgo       93410185RS01      HF        
            2370001300001A0000180410067500000604101404 STACIONE ROTATIVO LTDA EPP    5e74ba0fe5f88025d04f09102017BRL0000000000000000000000000865505e74ba0fe5f88025d04f09102017000000000000000                                          00010     05THF      
            2370001300002B   206200940000291                                                                                     00000000  09102017000000000086550000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
            2370001300003A0000187560403630000630000603 ASS COML DE CORONEL FABRICIANO261732fd1b2d162484bf09102017BRL000000000000000000000000011600261732fd1b2d162484bf09102017000000000000000                                          00010     05THF      
            2370001300004B   221224720000100                                                                                     00000000  09102017000000000011600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
            2370001300005A0000187560403630000630000603 ASS COML DE CORONEL FABRICIANOe759f90988b38f2ab03c09102017BRL000000000000000000000000012600e759f90988b38f2ab03c09102017000000000000000                                          00010     05THF      
            2370001300006B   221224720000100                                                                                     00000000  09102017000000000012600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
            23700015         000008000000000000110750000000000000000000000000                                                                                                                                                                               
            23799999         000001000010                                                                                                                                                                                                                   

"""

        exampleRetornoMany = """
            23700000         2071444070001310000317324          0350760000000003646 VERSUL TECNOLOGIA             BANCO BRADESCO S.A.                     2091020171654260000010890000000000000BRAD                                                         
            23700011C2041045 2071444070001310000317324          0350760000000003646 VERSUL TECNOLOGIA                                                     Rua Marcilio Dias             1659                Novo Hamburgo       93410185RS01      HF        
            2370001300001A0000180410067500000604101404 STACIONE ROTATIVO LTDA EPP    5e74ba0fe5f88025d04f09102017BRL0000000000000000000000000865505e74ba0fe5f88025d04f09102017000000000000000                                          00010     05THF      
            2370001300002B   206200940000291                                                                                     00000000  09102017000000000086550000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
            23700015         000008000000000000110750000000000000000000000000                                                                                                                                                                               
            23700021C2041045 2071444070001310000317324          0350760000000003646 VERSUL TECNOLOGIA                                                     Rua Marcilio Dias             1659                Novo Hamburgo       93410185RS01      HF        
            2370001300001A0000180410067500000604101404 STACIONE ROTATIVO LTDA EPP    5e74ba0fe5f88025d04f09102017BRL0000000000000000000000000865505e74ba0fe5f88025d04f09102017000000000000000                                          00010     05THF      
            2370001300002B   206200940000291                                                                                     00000000  09102017000000000086550000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
            2370001300003A0000187560403630000630000603 ASS COML DE CORONEL FABRICIANO261732fd1b2d162484bf09102017BRL000000000000000000000000011600261732fd1b2d162484bf09102017000000000000000                                          00010     05THF      
            2370001300004B   221224720000100                                                                                     00000000  09102017000000000011600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
            2370001300005A0000187560403630000630000603 ASS COML DE CORONEL FABRICIANOe759f90988b38f2ab03c09102017BRL000000000000000000000000012600e759f90988b38f2ab03c09102017000000000000000                                          00010     05THF      
            2370001300006B   221224720000100                                                                                     00000000  09102017000000000012600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
            23700025         000008000000000000110750000000000000000000000000                                                                                                                                                                               
            23799999         000002000006                                                                                                                                                                                                                   

        """

        #coffeelint: enable=no_trailing_whitespace
        
        it 'should return the right number of sections for each given file string', ->
            
            expectedExtracted =
                ArquivoHeader: {}
                Lote: [
                    
                ]
                ArquivoTrailer: {}
            
            retorno = new Retorno 'Bradesco', 'Pagamento'
            output = retorno.extract(exampleRetornoSingle)
            expect(output).to.have.property 'ArquivoHeader'
            expect(output).to.have.property 'ArquivoTrailing'
            expect(output).to.have.property 'lots'
            expect(output.lots).to.have.length 1
            expect(output.lots[0]).to.have.property 'LoteHeader'
            expect(output.lots[0]).to.have.property 'LoteTrailing'
            expect(output.lots[0]).to.have.property 'details'
            expect(output.lots[0].details).to.have.length 1
            
            output = retorno.extract(exampleRetornoTwoLots)
            expect(output).to.have.property 'ArquivoHeader'
            expect(output).to.have.property 'ArquivoTrailing'
            expect(output).to.have.property 'lots'
            expect(output.lots).to.have.length 2
            expect(output.lots[0]).to.have.property 'LoteHeader'
            expect(output.lots[0]).to.have.property 'LoteTrailing'
            expect(output.lots[0]).to.have.property 'details'
            expect(output.lots[0].details).to.have.length 1
            expect(output.lots[1]).to.have.property 'LoteHeader'
            expect(output.lots[1]).to.have.property 'LoteTrailing'
            expect(output.lots[1]).to.have.property 'details'
            expect(output.lots[1].details).to.have.length 1
            
            output = retorno.extract(exampleRetornoThreeDetails)
            expect(output).to.have.property 'ArquivoHeader'
            expect(output).to.have.property 'ArquivoTrailing'
            expect(output).to.have.property 'lots'
            expect(output.lots).to.have.length 1
            expect(output.lots[0]).to.have.property 'LoteHeader'
            expect(output.lots[0]).to.have.property 'LoteTrailing'
            expect(output.lots[0]).to.have.property 'details'
            expect(output.lots[0].details).to.have.length 3
            
            output = retorno.extract(exampleRetornoMany)
            expect(output).to.have.property 'ArquivoHeader'
            expect(output).to.have.property 'ArquivoTrailing'
            expect(output).to.have.property 'lots'
            expect(output.lots).to.have.length 2
            expect(output.lots[0]).to.have.property 'LoteHeader'
            expect(output.lots[0]).to.have.property 'LoteTrailing'
            expect(output.lots[0]).to.have.property 'details'
            expect(output.lots[0].details).to.have.length 1
            expect(output.lots[1]).to.have.property 'LoteHeader'
            expect(output.lots[1]).to.have.property 'LoteTrailing'
            expect(output.lots[1]).to.have.property 'details'
            expect(output.lots[1].details).to.have.length 3